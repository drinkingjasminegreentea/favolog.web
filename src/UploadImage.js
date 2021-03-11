import { BlobServiceClient } from '@azure/storage-blob'
import { v4 as uuidv4 } from 'uuid'

function getFileExtension(fileName) {
  const lastDot = fileName.lastIndexOf('.')
  return fileName.substring(lastDot)
}

export default async function uploadImage(file, containerName) {
  const blobName = uuidv4() + getFileExtension(file.name)
  const blobServiceClient = new BlobServiceClient(
    `https://${process.env.NEXT_PUBLIC_BLOBSTORAGEACCOUNT}.blob.core.windows.net${process.env.NEXT_PUBLIC_BLOBSTORAGESASKEY}`
  )
  const containerClient = blobServiceClient.getContainerClient(containerName)
  var options = { blobContentType: file.type }
  const blockBlobClient = containerClient.getBlockBlobClient(blobName)

  await blockBlobClient.uploadData(file, { blobHTTPHeaders: options })
  return blobName
}
